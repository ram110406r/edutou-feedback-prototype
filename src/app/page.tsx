"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, BarChart3, Star, Users, TrendingUp, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            feedback.edutou.in
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Collect, analyze, and act on user feedback with our beautiful and functional feedback system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/feedback">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-orange-500 hover:bg-orange-600">
                <MessageSquare className="w-5 h-5 mr-2" />
                Share Feedback
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-orange-500 text-orange-600 hover:bg-orange-50">
                <BarChart3 className="w-5 h-5 mr-2" />
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Star Ratings</CardTitle>
              <CardDescription>
                Interactive 5-star rating system for quick feedback collection
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Anonymous Option</CardTitle>
              <CardDescription>
                Allow users to submit feedback anonymously for honest opinions
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Visualize feedback data with beautiful charts and insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Real-time Updates</CardTitle>
              <CardDescription>
                Instant feedback submission and data visualization
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>CSV Export</CardTitle>
              <CardDescription>
                Download all feedback data for external analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow bg-white dark:bg-gray-800">
            <CardHeader>
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle>Secure Access</CardTitle>
              <CardDescription>
                Protected admin dashboard with authentication
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-orange-500 to-orange-400 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg mb-8 text-orange-50">
                Start collecting valuable feedback from your users today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/feedback">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-orange-50">
                    Submit Feedback
                  </Button>
                </Link>
                <Link href="/admin">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground">
          <p className="text-sm">
            Built with React, Next.js, Tailwind CSS, and Recharts
          </p>
          <p className="text-xs mt-2">
            Demo password for admin: <code className="bg-muted px-2 py-1 rounded">admin123</code>
          </p>
        </footer>
      </div>
    </div>
  );
}