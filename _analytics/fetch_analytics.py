#!/usr/bin/env python3
"""
Fetch Google Search Console and GA4 data, export to CSV files with date stamps.

Usage:
    python fetch_analytics.py

First-time setup:
    1. pip install -r requirements.txt
    2. Go to https://console.cloud.google.com
    3. Create a project (or use existing)
    4. Go to APIs & Services → Library, search for and enable:
       - "Google Search Console API"
       - "Google Analytics Data API"
    5. Go to APIs & Services → Credentials, click Create Credentials → OAuth client ID
       - Choose "Desktop app", download the JSON
    6. Set environment variables:
       export GOOGLE_CREDENTIALS_FILE=/path/to/credentials.json
       export GSC_SITE_URL=sc-domain:devsdecide.com
       export GA4_PROPERTY_ID=123456789
    7. Run this script — it will open a browser to authorize on first run

Output (in _analytics/output/YYYY-MM-DD/):
    Search Console: chart.csv, queries.csv, pages.csv, countries.csv, devices.csv, search_appearance.csv
    GA4: traffic_acquisition.csv
"""

import os
import csv
import sys
from datetime import date, timedelta
from pathlib import Path

SITE_URL = os.environ.get("GSC_SITE_URL", "sc-domain:devsdecide.com")
GA4_PROPERTY_ID = os.environ.get("GA4_PROPERTY_ID")
GOOGLE_CREDENTIALS_FILE = os.environ.get("GOOGLE_CREDENTIALS_FILE")

SCOPES = [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly",
]

SCRIPT_DIR = Path(__file__).parent
TOKEN_FILE = SCRIPT_DIR / "token.json"
OUTPUT_DIR = SCRIPT_DIR / "output"

SC_METRICS = ["clicks", "impressions", "ctr", "position"]


def get_credentials():
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request

    creds = None
    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not GOOGLE_CREDENTIALS_FILE or not Path(GOOGLE_CREDENTIALS_FILE).exists():
                print("ERROR: GOOGLE_CREDENTIALS_FILE env var not set or file not found.")
                print("Export it: export GOOGLE_CREDENTIALS_FILE=/path/to/credentials.json")
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(GOOGLE_CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        TOKEN_FILE.write_text(creds.to_json())

    return creds


def format_sc_row(row, dim_count):
    keys = row.get("keys", [])
    dims = keys[:dim_count]
    return dims + [
        row["clicks"],
        row["impressions"],
        f"{row['ctr'] * 100:.2f}%",
        f"{row['position']:.1f}",
    ]


def fetch_sc_report(service, start_date, end_date, dimensions, dim_headers, filename, run_dir):
    response = (
        service.searchanalytics()
        .query(
            siteUrl=SITE_URL,
            body={
                "startDate": start_date.isoformat(),
                "endDate": end_date.isoformat(),
                "dimensions": dimensions,
                "rowLimit": 1000,
                "dataState": "final",
            },
        )
        .execute()
    )

    rows = response.get("rows", [])
    if not rows:
        print(f"  {filename}: no data")
        return

    output_file = run_dir / filename
    with open(output_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(dim_headers + SC_METRICS)
        for row in rows:
            writer.writerow(format_sc_row(row, len(dimensions)))

    print(f"  {filename}: {len(rows)} rows")


def fetch_search_console(creds, run_dir):
    from googleapiclient.discovery import build

    service = build("searchconsole", "v1", credentials=creds)

    end_date = date.today() - timedelta(days=3)
    start_date = end_date - timedelta(days=28)

    print("Search Console:")

    # chart.csv — daily performance over time
    fetch_sc_report(service, start_date, end_date,
                    ["date"], ["date"],
                    "chart.csv", run_dir)

    # queries.csv
    fetch_sc_report(service, start_date, end_date,
                    ["query"], ["query"],
                    "queries.csv", run_dir)

    # pages.csv
    fetch_sc_report(service, start_date, end_date,
                    ["page"], ["page"],
                    "pages.csv", run_dir)

    # countries.csv
    fetch_sc_report(service, start_date, end_date,
                    ["country"], ["country"],
                    "countries.csv", run_dir)

    # devices.csv
    fetch_sc_report(service, start_date, end_date,
                    ["device"], ["device"],
                    "devices.csv", run_dir)

    # search_appearance.csv
    fetch_sc_report(service, start_date, end_date,
                    ["searchAppearance"], ["search_appearance"],
                    "search_appearance.csv", run_dir)


def fetch_ga4(creds, run_dir):
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        RunReportRequest,
        DateRange,
        Dimension,
        Metric,
        OrderBy,
    )

    client = BetaAnalyticsDataClient(credentials=creds)

    end_date = date.today() - timedelta(days=1)
    start_date = end_date - timedelta(days=28)

    request = RunReportRequest(
        property=f"properties/{GA4_PROPERTY_ID}",
        date_ranges=[
            DateRange(start_date=start_date.isoformat(), end_date=end_date.isoformat())
        ],
        dimensions=[
            Dimension(name="sessionDefaultChannelGroup"),
            Dimension(name="sessionSource"),
            Dimension(name="sessionMedium"),
        ],
        metrics=[
            Metric(name="sessions"),
            Metric(name="engagementRate"),
            Metric(name="engagedSessions"),
            Metric(name="averageSessionDuration"),
            Metric(name="screenPageViews"),
        ],
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)
        ],
        limit=500,
    )

    response = client.run_report(request)

    print("GA4:")

    if not response.rows:
        print("  traffic_acquisition.csv: no data")
        return

    output_file = run_dir / "traffic_acquisition.csv"
    with open(output_file, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "channel_group", "source", "medium",
            "sessions", "engagement_rate", "engaged_sessions",
            "avg_session_duration_s", "page_views",
        ])
        for row in response.rows:
            writer.writerow([
                row.dimension_values[0].value,
                row.dimension_values[1].value,
                row.dimension_values[2].value,
                int(row.metric_values[0].value),
                f"{float(row.metric_values[1].value) * 100:.2f}%",
                int(row.metric_values[2].value),
                f"{float(row.metric_values[3].value):.1f}",
                int(row.metric_values[4].value),
            ])

    print(f"  traffic_acquisition.csv: {len(response.rows)} rows")


def main():
    if not GA4_PROPERTY_ID:
        print("ERROR: GA4_PROPERTY_ID env var not set.")
        print("Export it: export GA4_PROPERTY_ID=123456789")
        sys.exit(1)

    today = date.today()
    run_dir = OUTPUT_DIR / today.isoformat()
    run_dir.mkdir(parents=True, exist_ok=True)

    print(f"Fetching analytics data ({today.isoformat()})...\n")

    creds = get_credentials()
    fetch_search_console(creds, run_dir)
    print()
    fetch_ga4(creds, run_dir)

    print(f"\nDone. Files in {run_dir}/")


if __name__ == "__main__":
    main()
