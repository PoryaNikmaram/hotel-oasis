// app/_components/__tests__/textExpander.test.js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextExpander from '../TextExpander';

const longText =
  'این یک متن آزمایشی بلند است که برای تست کامپوننت TextExpander استفاده می‌شود. این متن باید شامل بیش از چهل کلمه باشد تا عملکرد کوتاه سازی به درستی بررسی شود. برای این منظور، کلمات بیشتری اضافه می‌کنیم: توسعه نرم‌افزار، جاوا اسکریپت، ری‌اکت، تست‌نویسی، کتابخانه، برنامه‌نویسی، آموزش، پروژه، و غیره. ما می‌خواهیم مطمئن شویم که قابلیت "Show more" و "Show less" به درستی کار می‌کنند. تعداد کلمات در این نقطه باید کافی باشد.';

const shortText = 'این یک متن آزمایشی کوتاه است.';

describe('TextExpander Component', () => {
  const user = userEvent.setup();

  describe('Initial Rendering', () => {
    it('should render the full text and no button if it has 40 words or less', () => {
      render(<TextExpander>{shortText}</TextExpander>);

      expect(screen.getByText(shortText)).toBeInTheDocument();
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render a truncated text with "..." and "Show more" button for long text', () => {
      render(<TextExpander>{longText}</TextExpander>);
      const truncatedText = `${longText.split(' ').slice(0, 40).join(' ')}...`;

      expect(screen.getByText(truncatedText)).toBeInTheDocument();
      expect(screen.queryByText(longText)).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Show more/i })
      ).toBeInTheDocument();
    });
  });

  describe('Interaction (Show more/less)', () => {
    it('should expand the text when "Show more" is clicked', async () => {
      render(<TextExpander>{longText}</TextExpander>);
      const showMoreButton = screen.getByRole('button', { name: /Show more/i });
      await user.click(showMoreButton);

      expect(screen.getByText(longText)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Show less/i })
      ).toBeInTheDocument();
    });

    it('should collapse the text when "Show less" is clicked after expansion', async () => {
      render(<TextExpander>{longText}</TextExpander>);
      await user.click(screen.getByRole('button', { name: /Show more/i }));

      const showLessButton = screen.getByRole('button', { name: /Show less/i });
      await user.click(showLessButton);

      const truncatedText = `${longText.split(' ').slice(0, 40).join(' ')}...`;
      expect(screen.getByText(truncatedText)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /Show more/i })
      ).toBeInTheDocument();
    });
  });

  describe('Edge Cases and Styling', () => {
    it('should render correctly with empty children', () => {
      const { container } = render(<TextExpander>{''}</TextExpander>);

      expect(container.firstChild.textContent).toBe('');
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should have the correct styling classes on the button', () => {
      render(<TextExpander>{longText}</TextExpander>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(
        'text-primary-700',
        'border-b',
        'border-primary-700'
      );
    });
  });
});
