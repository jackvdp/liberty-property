export default function Dashboard() {
  return (
    <div className="min-h-screen bg-liberty-base flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-reckless font-bold text-liberty-standard mb-6">
          Dashboard
        </h1>
        <p className="text-lg text-liberty-standard/70 mb-8">
          Welcome to your Liberty Bell dashboard. Here you can track your progress and manage your case.
        </p>
        <div className="bg-liberty-secondary/20 rounded-lg p-8 border border-liberty-secondary/30">
          <p className="text-liberty-standard/60">
            Dashboard features coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
