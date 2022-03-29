import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Main Header/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders a body',()=>{
  render(<App />);
  const bodyStr = screen.getByText(/Body/i);
  expect(bodyStr).toBeInTheDocument();
})