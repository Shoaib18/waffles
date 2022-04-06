/* eslint-disable no-console */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { useState } from 'react';

import { ErrorBoundary } from '../index';

beforeAll(() => {
  // Silence console errors for this test suite
  jest.spyOn(console, 'error').mockImplementation(jest.fn());
});

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

function ThrowErrorComponent() {
  throw new Error('Very serious error!');
  return null;
}

function TestComponent() {
  const [hasError, setHasError] = useState(false);

  return (
    <ErrorBoundary
      onReset={() => {
        setHasError(false);
      }}
    >
      <button
        onClick={() => {
          setHasError(true);
        }}
      >
        Crash
      </button>
      <p>Regular content</p>
      {hasError ? <ThrowErrorComponent /> : null}
    </ErrorBoundary>
  );
}

describe('ErrorBoundary', () => {
  it('renders children if no error occurred', () => {
    const { getByText } = render(<ErrorBoundary>Test</ErrorBoundary>);

    const content = getByText('Test');

    expect(content).toBeInTheDocument();
  });

  it('renders error notificaiton if error occured', async () => {
    const { getByRole, getByText } = render(
      <ErrorBoundary>
        <ThrowErrorComponent />
      </ErrorBoundary>,
    );

    let notification;
    await waitFor(() => {
      notification = getByRole('status');
    });
    const errorMessage = getByText(/very serious error/i);

    expect(notification).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(2);
  });

  it('when error occurs onError handler is called', () => {
    const handleOnError = jest.fn();
    render(
      <ErrorBoundary onError={handleOnError}>
        <ThrowErrorComponent />
      </ErrorBoundary>,
    );

    expect(handleOnError).toHaveBeenCalledTimes(1);
  });

  it('allows to manually reset an error state', async () => {
    const { getByText, getByRole } = render(<TestComponent />);

    const crashButton = getByText('Crash');
    fireEvent.click(crashButton);
    let notification;
    await waitFor(() => {
      notification = getByRole('status');
    });

    expect(notification).toBeInTheDocument();

    const resetButton = getByText('Try Again');
    fireEvent.click(resetButton);
    const content = getByText('Regular content');

    expect(content).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledTimes(2);
  });
});
