import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { challengeStore } from '@/lib/challengeStore';
import { questionSets } from '@/lib/quizData';
import ChallengeClient from './challenge-client';

export function generateStaticParams() {
  return challengeStore.getAllChallenges().map((challenge) => ({
    challengeId: challenge.id,
  }));
}

export default async function ChallengePage({ params }: { params: { challengeId: string } }) {
  const { challengeId } = params;
  
  const challenge = challengeStore.getChallenge(challengeId);

  if (!challenge) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <p className="text-gray-600">Challenge not found.</p>
            <Link href="/challenges">
              <Button className="mt-4">Back to Challenges</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Generate questions based on challenge config
  let questions: any[] = [];
  
  if (challenge.config.categories) {
    // Filter questions by categories
    const allQuestions = Object.values(questionSets).flat();
    questions = allQuestions.filter(q => 
      challenge.config.categories!.includes(q.category)
    );
  } else {
    // Use all questions
    questions = Object.values(questionSets).flat();
  }

  // Shuffle and limit questions
  questions = questions.sort(() => Math.random() - 0.5);
  if (challenge.config.questionCount) {
    questions = questions.slice(0, challenge.config.questionCount);
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <p className="text-gray-600">No questions available for this challenge.</p>
            <Link href="/challenges">
              <Button className="mt-4">Back to Challenges</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <ChallengeClient challenge={challenge} questions={questions} />;
}