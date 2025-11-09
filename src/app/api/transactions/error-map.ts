export function mapTransactionErrorToStatus(error: unknown): number {
  if (!(error instanceof Error)) {
    return 500;
  }

  switch (error.message) {
    case 'User ID is required':
    case 'Transaction ID is required':
      return 400;
    case 'Transaction not found':
      return 404;
    case 'Not authorized':
      return 403;
    default:
      return 500;
  }
}

export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Erro inesperado';
}
