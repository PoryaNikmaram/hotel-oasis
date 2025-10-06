// app/components/__tests__/TextExpander.test.js
import { fireEvent, render, screen } from '@testing-library/react';
import TextExpander from '../TextExpander';

describe('TextExpander Component', () => {
  const longText = Array(100).fill('word').join(' ');
  const shortText = 'This is a short text.';

  describe('Rendering', () => {
    it('should render truncated text initially when text is long', () => {
      render(<TextExpander>{longText}</TextExpander>);

      const button = screen.getByRole('button', { name: /Show more/ });
      expect(button).toBeInTheDocument();

      expect(screen.getByText(/word word word/)).toBeInTheDocument();
      expect(screen.getByText(/.../)).toBeInTheDocument();
    });

    it('should render full text initially if text is short', () => {
      render(<TextExpander>{shortText}</TextExpander>);

      expect(screen.getByText(shortText)).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /Show more/ })
      ).toBeInTheDocument();
    });
  });

  describe('Behavior', () => {
    it('should expand text when "Show more" is clicked', () => {
      render(<TextExpander>{longText}</TextExpander>);

      const button = screen.getByRole('button', { name: /Show more/ });
      fireEvent.click(button);

      expect(screen.getByText(longText)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Show less/ })
      ).toBeInTheDocument();
    });

    it('should collapse text when "Show less" is clicked', () => {
      render(<TextExpander>{longText}</TextExpander>);

      const button = screen.getByRole('button', { name: /Show more/ });
      fireEvent.click(button);

      const collapseButton = screen.getByRole('button', { name: /Show less/ });
      fireEvent.click(collapseButton);

      expect(screen.getByText(/word word word/)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Show more/ })
      ).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string gracefully', () => {
      render(<TextExpander>{''}</TextExpander>);

      expect(screen.getByText('...')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle exactly 40 words without truncating', () => {
      const fortyWords = Array(40).fill('word').join(' ');
      render(<TextExpander>{fortyWords}</TextExpander>);

      expect(screen.getByText(`${fortyWords}...`)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Show more/ })
      ).toBeInTheDocument();
    });
  });

  describe('Styling and Classes', () => {
    it('should apply correct button classes', () => {
      render(<TextExpander>{longText}</TextExpander>);

      const button = screen.getByRole('button', { name: /Show more/ });
      expect(button).toHaveClass(
        'text-primary-700',
        'border-b',
        'border-primary-700',
        'leading-3',
        'pb-1'
      );
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button name', () => {
      render(<TextExpander>{longText}</TextExpander>);

      const button = screen.getByRole('button');
      expect(button).toHaveAccessibleName('Show more');
    });
  });
});
