const AuthImagePattern = ({ title, subtitle }) => {
    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 min-h-full">
        <div className="max-w-64 text-center">
          {/* Grid of 9 boxes with reduced horizontal gap */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[...Array(9)].map((_, i) => {
              const isAnimated = [1, 3, 5, 7].includes(i); // Boxes 2, 4, 6, 8 (0-based)
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl bg-primary/10 ${
                    isAnimated
                      ? "bg-indigo-500 animate-pulse shadow-lg shadow-indigo-500/30"
                      : "bg-indigo-500/30"
                  }`}
                />
              );
            })}
          </div>
  
          {/* Title and subtitle */}
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          <p className="text-sm text-white/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  