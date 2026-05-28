/**
 * Calculate which page numbers should be displayed in pagination
 * Returns array with page numbers and null for ellipsis
 */
export function getPaginationPages(
  currentPage: number,
  totalPages: number,
  maxVisible = 5,
): (number | null)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | null)[] = [];
  const halfVisible = Math.floor(maxVisible / 2);

  let startPage = Math.max(1, currentPage - halfVisible);
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  // Adjust start if end is at the limit
  if (endPage === totalPages) {
    startPage = Math.max(1, totalPages - maxVisible + 1);
  }

  // Add first page
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push(null); // ellipsis
    }
  }

  // Add middle pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Add last page
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push(null); // ellipsis
    }
    pages.push(totalPages);
  }

  return pages;
}
