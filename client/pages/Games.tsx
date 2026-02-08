import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";
import { Search, Gamepad2 } from "lucide-react";
import { toast } from "sonner";

interface Game {
  id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  minWager: number;
  maxWager: number;
  rtp: number;
}

export default function Games() {
  const { user } = useAuth();
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const filtered = games.filter(
      (game) =>
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.description?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [search, games]);

  const fetchGames = async () => {
    try {
      const response = await fetch("/api/games");
      const data = await response.json();
      setGames(data.games || []);
    } catch (error) {
      console.error("Failed to load games:", error);
      toast.error("Failed to load games");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayGame = (game: Game) => {
    toast.info(
      `${game.name} game session starting... This is a simulation. In production, this would launch the game.`
    );
    // In a real scenario, this would launch the game with the WebGL/WebAssembly engine
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-amber-300 mb-4">Game Library</h1>
          <p className="text-slate-400 text-lg mb-6">
            Explore our collection of premium casino games. Current Balance:{" "}
            <span className="text-amber-300 font-bold">
              {(user?.wallet?.goldCoins || 0).toLocaleString()} Gold Coins
            </span>
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search games..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-slate-900/50 border-amber-400/30"
            />
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <Card
                key={game.id}
                className="border-slate-700/50 bg-slate-800/30 hover:border-amber-400/40 hover:shadow-lg hover:shadow-amber-400/20 transition-all overflow-hidden group cursor-pointer"
                onClick={() => setSelectedGame(game)}
              >
                {/* Game Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Gamepad2 className="w-12 h-12 text-amber-400/50 group-hover:scale-110 transition-transform" />
                </div>

                {/* Content */}
                <CardContent className="pt-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-amber-300 transition">
                    {game.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                    {game.description || "Premium casino game experience"}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="bg-blue-900/30 rounded px-2 py-1">
                      <p className="text-blue-300">RTP</p>
                      <p className="font-bold text-white">{game.rtp}%</p>
                    </div>
                    <div className="bg-green-900/30 rounded px-2 py-1">
                      <p className="text-green-300">Min Bet</p>
                      <p className="font-bold text-white">
                        {game.minWager.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayGame(game);
                    }}
                    className="w-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300 font-semibold py-2"
                  >
                    Play Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No games found matching your search</p>
          </div>
        )}

        {/* Game Detail Modal */}
        {selectedGame && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl border-amber-400/40">
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-amber-300 mb-2">
                      {selectedGame.name}
                    </h2>
                    <p className="text-slate-300">
                      {selectedGame.description || "Premium casino game"}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedGame(null)}
                    className="text-slate-400 hover:text-white text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Game Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-900/20 rounded-lg p-4">
                    <p className="text-blue-300 text-sm mb-1">Return to Player</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedGame.rtp}%
                    </p>
                  </div>
                  <div className="bg-green-900/20 rounded-lg p-4">
                    <p className="text-green-300 text-sm mb-1">Min Bet</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedGame.minWager.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4">
                    <p className="text-purple-300 text-sm mb-1">Max Bet</p>
                    <p className="text-2xl font-bold text-white">
                      {selectedGame.maxWager.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-900/20 border border-blue-400/30 rounded-lg p-4">
                  <p className="text-blue-300 text-sm">
                    <strong>Game Information:</strong> This is a simulation of
                    the game in production. In a live environment, this would
                    connect to our gaming engine and handle real wagers. The
                    game uses industry-standard RNG (Random Number Generator)
                    for fair play.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => {
                      handlePlayGame(selectedGame);
                      setSelectedGame(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 hover:from-amber-300 hover:to-yellow-300 font-semibold py-3"
                  >
                    Play Now
                  </Button>
                  <Button
                    onClick={() => setSelectedGame(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
