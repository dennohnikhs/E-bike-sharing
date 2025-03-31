export default function Hero() {
  return (
    <div className="space-y-6 mb-12">
      <h1 className="text-4xl md:text-6xl font-display font-bold" style={{ color: 'var(--color-earth-dark)' }}>
        Welcome to Nairobi E-Bike Masters
      </h1>
      <p className="text-xl md:text-2xl max-w-2xl mx-auto" style={{ color: 'var(--color-earth-dark)', opacity: 0.8 }}>
        Find and rent an e-bike instantly using QR codes. 
        Join the eco-friendly revolution in urban mobility.
      </p>
    </div>
  );
}
