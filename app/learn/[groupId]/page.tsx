import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { questionManager } from "@/lib/questionManager";
import Link from "next/link";
import QuizClient from "./quiz-client";

export function generateStaticParams() {
    const categories = questionManager.getCategories();
    return Object.keys(categories).map((groupId: string) => ({
        groupId,
    }));
}

export default async function LearnPage({
    params,
}: {
    params: { groupId: string };
}) {
    const { groupId } = params;

    const questions = questionManager.getQuestionsByCategory(groupId);
    const categories = questionManager.getCategories();
    const groupName = categories[groupId]?.name;

    if (!questions.length || !groupName) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-6">
                        <p className="text-gray-600">
                            Group not found or no questions available.
                        </p>
                        <Link href="/">
                            <Button className="mt-4">Back to Home</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <QuizClient
            questions={questions}
            groupName={groupName}
            groupId={groupId}
        />
    );
}
