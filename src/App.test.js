import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the homepage hero content', () => {
  render(<App />);
  expect(screen.getByText(/AI for Small Business/i)).toBeInTheDocument();
  expect(screen.getByText(/Your business runs on people/i)).toBeInTheDocument();
});
