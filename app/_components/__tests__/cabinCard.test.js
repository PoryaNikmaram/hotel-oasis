// app/components/__tests__/CabinCard.test.js
import { render, screen } from '@testing-library/react';
import CabinCard from '../CabinCard';

// Mock the Heroicons to avoid import issues
jest.mock('@heroicons/react/24/solid', () => ({
  UsersIcon: function UsersIcon(props) {
    return <svg {...props} data-testid='users-icon' />;
  }
}));

describe('CabinCard Component', () => {
  // Default props for testing
  const defaultCabin = {
    id: '1',
    name: 'Cabin 001',
    maxCapacity: 4,
    regularPrice: 250,
    discount: 0,
    image: '/cabin-001.jpg'
  };

  const cabinWithDiscount = {
    ...defaultCabin,
    discount: 50,
    regularPrice: 300
  };

  describe('Rendering', () => {
    it('should render cabin card with all basic information', () => {
      render(<CabinCard cabin={defaultCabin} />);

      // Check cabin name is displayed (match full heading text, ignoring whitespace)
      expect(
        screen.getByRole('heading', { level: 3, name: /Cabin\s*Cabin 001/ })
      ).toBeInTheDocument();

      // Check capacity information
      expect(screen.getByText(/For up to/)).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText(/guests/)).toBeInTheDocument();

      // Check price display
      expect(screen.getByText('$250')).toBeInTheDocument();
      expect(screen.getByText('/ night')).toBeInTheDocument();
    });

    it('should render cabin image with correct attributes', () => {
      render(<CabinCard cabin={defaultCabin} />);

      const image = screen.getByAltText('Cabin Cabin 001');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/cabin-001.jpg');
    });

    it('should render users icon', () => {
      render(<CabinCard cabin={defaultCabin} />);

      const icon = screen.getByTestId('users-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('size-5', 'text-primary-600');
    });

    it('should render details link with correct href', () => {
      render(<CabinCard cabin={defaultCabin} />);

      const link = screen.getByRole('link', { name: /Details & reservation/ });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/cabins/1');
    });
  });

  describe('Price Display Logic', () => {
    it('should display regular price when no discount', () => {
      render(<CabinCard cabin={defaultCabin} />);

      // Should show only regular price
      expect(screen.getByText('$250')).toBeInTheDocument();

      // Should not show strikethrough price
      const strikethroughElements = document.querySelectorAll('.line-through');
      expect(strikethroughElements).toHaveLength(0);
    });

    it('should display discounted price and original price when discount exists', () => {
      render(<CabinCard cabin={cabinWithDiscount} />);

      // Should show discounted price (300 - 50 = 250)
      expect(screen.getByText('$250')).toBeInTheDocument();

      // Should show original price with strikethrough
      const originalPrice = screen.getByText('$300');
      expect(originalPrice).toBeInTheDocument();
      expect(originalPrice).toHaveClass('line-through');
    });

    it('should calculate correct discounted price', () => {
      const customCabin = {
        ...defaultCabin,
        regularPrice: 500,
        discount: 125
      };

      render(<CabinCard cabin={customCabin} />);

      // Should show 500 - 125 = 375
      expect(screen.getByText('$375')).toBeInTheDocument();
      expect(screen.getByText('$500')).toHaveClass('line-through');
    });
  });

  describe('Styling and Classes', () => {
    it('should have correct container styling', () => {
      const { container } = render(<CabinCard cabin={defaultCabin} />);

      const mainDiv = container.firstChild;
      expect(mainDiv).toHaveClass('flex', 'border', 'border-primary-800');
    });

    it('should have correct background colors', () => {
      render(<CabinCard cabin={defaultCabin} />);

      // Find elements with specific background classes
      const primaryBgElements = document.querySelectorAll('.bg-primary-950');
      expect(primaryBgElements.length).toBeGreaterThan(0);
    });

    it('should have hover effect on details link', () => {
      render(<CabinCard cabin={defaultCabin} />);

      const link = screen.getByRole('link', { name: /Details & reservation/ });
      expect(link).toHaveClass(
        'hover:bg-accent-600',
        'hover:text-primary-900',
        'transition-all'
      );
    });
  });

  describe('Edge Cases', () => {
    it('should handle cabin with zero capacity', () => {
      const zeroCapacityCabin = { ...defaultCabin, maxCapacity: 0 };
      render(<CabinCard cabin={zeroCapacityCabin} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should handle cabin with very long name', () => {
      const longNameCabin = {
        ...defaultCabin,
        name: 'Super Luxury Premium Deluxe Cabin with Extended Name'
      };
      render(<CabinCard cabin={longNameCabin} />);

      expect(
        screen.getByText(
          'Cabin Super Luxury Premium Deluxe Cabin with Extended Name'
        )
      ).toBeInTheDocument();
    });

    it('should handle negative discount gracefully', () => {
      const negativeCabin = {
        ...defaultCabin,
        regularPrice: 200,
        discount: -50 // This would be a data error
      };
      render(<CabinCard cabin={negativeCabin} />);

      // Should treat negative discount as no discount
      expect(screen.getByText('$200')).toBeInTheDocument();
    });

    it('should handle missing image gracefully', () => {
      const noImageCabin = { ...defaultCabin, image: '' };
      render(<CabinCard cabin={noImageCabin} />);

      const image = screen.getByAltText(`Cabin ${noImageCabin.name}`);
      expect(image).toHaveAttribute('src', '');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible link text', () => {
      render(<CabinCard cabin={defaultCabin} />);

      const link = screen.getByRole('link');
      expect(link).toHaveAccessibleName(/Details & reservation/);
    });

    it('should have proper heading hierarchy', () => {
      render(<CabinCard cabin={defaultCabin} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Cabin 001');
    });

    it('should have descriptive alt text for images', () => {
      render(<CabinCard cabin={defaultCabin} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAccessibleName('Cabin Cabin 001');
    });
  });

  describe('Integration', () => {
    it('should render multiple cabin cards correctly', () => {
      const cabins = [
        { ...defaultCabin, id: '1', name: 'Cabin 001' },
        { ...defaultCabin, id: '2', name: 'Cabin 002' },
        { ...defaultCabin, id: '3', name: 'Cabin 003' }
      ];

      render(
        <div>
          {cabins.map(cabin => (
            <CabinCard key={cabin.id} cabin={cabin} />
          ))}
        </div>
      );

      expect(screen.getByText('Cabin 001')).toBeInTheDocument();
      expect(screen.getByText('Cabin 002')).toBeInTheDocument();
      expect(screen.getByText('Cabin 003')).toBeInTheDocument();

      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
      expect(links[0]).toHaveAttribute('href', '/cabins/1');
      expect(links[1]).toHaveAttribute('href', '/cabins/2');
      expect(links[2]).toHaveAttribute('href', '/cabins/3');
    });
  });
});
