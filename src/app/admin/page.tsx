"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Lock, LogOut, Download, Star, TrendingUp, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

interface Feedback {
  id: number;
  name: string;
  rating: number;
  comment: string;
  anonymous: boolean;
  created_at: string;
}

interface Summary {
  totalFeedbacks: number;
  averageRating: number;
  ratingDistribution: { rating: number; count: number }[];
}

const COLORS = ["#ef4444", "#f97316", "#eab308", "#fb923c", "#f97316"];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_PASSWORD = "admin123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      fetchData();
    } else {
      setError("Invalid password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setFeedbacks([]);
    setSummary(null);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [feedbackRes, summaryRes] = await Promise.all([
        fetch("/api/feedback"),
        fetch("/api/feedback/summary"),
      ]);

      const feedbackData = await feedbackRes.json();
      const summaryData = await summaryRes.json();

      if (feedbackData.success) {
        setFeedbacks(feedbackData.data.reverse());
      }
      if (summaryData.success) {
        setSummary(summaryData.data);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "Name", "Rating", "Comment", "Anonymous", "Date"];
    const rows = feedbacks.map((f) => [
      f.id,
      f.name,
      f.rating,
      `"${f.comment.replace(/"/g, '""')}"`,
      f.anonymous,
      new Date(f.created_at).toLocaleString(),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedbacks-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-4">
                <Lock className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Enter password to access dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Demo password: admin123
                </p>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                Login
              </Button>

              <div className="text-center">
                <Link href="/" className="text-sm text-muted-foreground hover:underline">
                  Back to Home
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Feedback analytics and management
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">Home</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout} className="border-orange-500 text-orange-600 hover:bg-orange-50">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading data...</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Feedbacks
                    </CardTitle>
                    <MessageSquare className="w-4 h-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">{summary.totalFeedbacks}</div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Average Rating
                    </CardTitle>
                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600 flex items-center gap-2">
                      {summary.averageRating.toFixed(2)}
                      <span className="text-sm text-muted-foreground">/ 5.0</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      5-Star Reviews
                    </CardTitle>
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-orange-600">
                      {summary.ratingDistribution.find((r) => r.rating === 5)?.count || 0}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Charts */}
            {summary && summary.totalFeedbacks > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Rating Distribution</CardTitle>
                    <CardDescription>Breakdown of ratings received</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={summary.ratingDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rating" label={{ value: "Stars", position: "insideBottom", offset: -5 }} />
                        <YAxis label={{ value: "Count", angle: -90, position: "insideLeft" }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f97316" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle>Rating Percentage</CardTitle>
                    <CardDescription>Proportion of each rating</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={summary.ratingDistribution.filter((r) => r.count > 0)}
                          dataKey="count"
                          nameKey="rating"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label={(entry) => `${entry.rating}★: ${entry.count}`}
                        >
                          {summary.ratingDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.rating - 1]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Feedback Table */}
            <Card className="shadow-lg border-0 bg-white dark:bg-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Feedbacks</CardTitle>
                  <CardDescription>Recent feedback submissions</CardDescription>
                </div>
                <Button onClick={exportToCSV} disabled={feedbacks.length === 0} className="bg-orange-500 hover:bg-orange-600">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                {feedbacks.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No feedback submissions yet
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="min-w-[300px]">Comment</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feedbacks.map((feedback) => (
                          <TableRow key={feedback.id}>
                            <TableCell className="whitespace-nowrap">
                              {new Date(feedback.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {feedback.anonymous ? (
                                <Badge variant="secondary">Anonymous</Badge>
                              ) : (
                                feedback.name || "Anonymous"
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {[...Array(feedback.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-orange-400 text-orange-400"
                                  />
                                ))}
                                <span className="ml-1 text-sm">({feedback.rating})</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="max-w-md truncate" title={feedback.comment}>
                                {feedback.comment || "-"}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}