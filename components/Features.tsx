import { BoltIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function Features() {
  return (
    <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mb-12">
      <FeatureCard
        icon={<BoltIcon className="w-6 h-6 text-white" />}
        title="Quick Rental"
        description="Scan, pay, and ride in minutes. Our QR code system makes renting simple and hassle-free."
        iconBg="var(--color-primary)"
        titleColor="var(--color-primary-dark)"
      />
      <FeatureCard
        icon={<MapPinIcon className="w-6 h-6 text-white" />}
        title="City-wide Access"
        description="Find e-bikes across Nairobi. Perfect for commuting, leisure, or exploring the city."
        iconBg="var(--color-secondary)"
        titleColor="var(--color-secondary-dark)"
      />
    </div>
  );
}

function FeatureCard({ icon, title, description, iconBg, titleColor }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center space-x-4 mb-4">
        <div style={{ background: iconBg }} className="rounded-full p-3">
          {icon}
        </div>
        <h3 className="text-xl font-display font-semibold" style={{ color: titleColor }}>{title}</h3>
      </div>
      <p style={{ color: 'var(--color-earth-dark)', opacity: 0.7 }}>{description}</p>
    </div>
  );
}
