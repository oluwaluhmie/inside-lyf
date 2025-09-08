import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Calendar, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Football = () => {
  const [selectedLeague, setSelectedLeague] = useState("premier-league");
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [upcomingMatches, setUpcomingMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for demonstration - replace with real API calls
  const mockLiveMatches = [
    {
      id: 1,
      homeTeam: "Manchester United",
      awayTeam: "Liverpool",
      homeScore: 2,
      awayScore: 1,
      minute: "67'",
      league: "Premier League",
      status: "live"
    },
    {
      id: 2,
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      homeScore: 1,
      awayScore: 1,
      minute: "45+2'",
      league: "La Liga",
      status: "live"
    },
    {
      id: 3,
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      homeScore: 3,
      awayScore: 2,
      minute: "89'",
      league: "Bundesliga",
      status: "live"
    }
  ];

  const mockUpcomingMatches = [
    {
      id: 4,
      homeTeam: "Chelsea",
      awayTeam: "Arsenal",
      time: "20:00",
      date: "Today",
      league: "Premier League",
      status: "upcoming"
    },
    {
      id: 5,
      homeTeam: "AC Milan",
      awayTeam: "Inter Milan",
      time: "21:45",
      date: "Today",
      league: "Serie A",
      status: "upcoming"
    },
    {
      id: 6,
      homeTeam: "PSG",
      awayTeam: "Marseille",
      time: "21:00",
      date: "Tomorrow",
      league: "Ligue 1",
      status: "upcoming"
    }
  ];

  const leagues = [
    { id: "premier-league", name: "Premier League", country: "England" },
    { id: "la-liga", name: "La Liga", country: "Spain" },
    { id: "bundesliga", name: "Bundesliga", country: "Germany" },
    { id: "serie-a", name: "Serie A", country: "Italy" },
    { id: "ligue-1", name: "Ligue 1", country: "France" },
    { id: "champions-league", name: "Champions League", country: "Europe" }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLiveMatches(mockLiveMatches);
      setUpcomingMatches(mockUpcomingMatches);
      setLoading(false);
    }, 1000);

    // Set up refresh interval for live scores
    const interval = setInterval(() => {
      // Refresh live scores every 30 seconds
      console.log("Refreshing live scores...");
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedLeague]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Scores Updated",
        description: "Live scores have been refreshed",
      });
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-slate-50 via-green-50/30 to-blue-50/40">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">Football Live Scores</h1>
          </div>
          <p className="text-lg opacity-90 mb-6">
            Real-time scores from major leagues around the world
          </p>
          <Button 
            onClick={handleRefresh}
            className="bg-white text-green-600 hover:bg-gray-100"
          >
            Refresh Scores
          </Button>
        </div>

        {/* League Selector */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Select League</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {leagues.map((league) => (
              <Card
                key={league.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-lg ${
                  selectedLeague === league.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-green-300"
                }`}
                onClick={() => setSelectedLeague(league.id)}
              >
                <div className="text-center">
                  <div className="font-semibold text-sm">{league.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{league.country}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Matches Tabs */}
        <Tabs defaultValue="live" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="live">
              <Clock className="h-4 w-4 mr-2" />
              Live
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="finished">
              <Trophy className="h-4 w-4 mr-2" />
              Finished
            </TabsTrigger>
          </TabsList>

          {/* Live Matches */}
          <TabsContent value="live" className="mt-6">
            <div className="grid gap-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading live scores...</p>
                </div>
              ) : liveMatches.length > 0 ? (
                liveMatches.map((match) => (
                  <Card key={match.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="destructive" className="animate-pulse">
                        LIVE {match.minute}
                      </Badge>
                      <span className="text-sm text-gray-600">{match.league}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 text-right">
                        <div className="font-semibold text-lg">{match.homeTeam}</div>
                      </div>
                      <div className="mx-6 text-center">
                        <div className="text-3xl font-bold">
                          {match.homeScore} - {match.awayScore}
                        </div>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-lg">{match.awayTeam}</div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No live matches at the moment</p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Upcoming Matches */}
          <TabsContent value="upcoming" className="mt-6">
            <div className="grid gap-4">
              {upcomingMatches.map((match) => (
                <Card key={match.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline">
                      {match.date} • {match.time}
                    </Badge>
                    <span className="text-sm text-gray-600">{match.league}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 text-right">
                      <div className="font-semibold text-lg">{match.homeTeam}</div>
                    </div>
                    <div className="mx-6">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-lg">{match.awayTeam}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Finished Matches */}
          <TabsContent value="finished" className="mt-6">
            <Card className="p-12 text-center">
              <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No finished matches to display</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <div className="flex gap-4">
            <AlertCircle className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Live Score Updates</h3>
              <p className="text-blue-800 text-sm">
                Scores are updated automatically every 30 seconds. For real-time data integration,
                connect to a sports API service like API-Football, SportRadar, or TheScoreAPI.
              </p>
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Football;