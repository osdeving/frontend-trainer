import { challengeStore } from "@/lib/challengeStore";
import ChallengeClient from "./challenge-client";

export async function generateStaticParams() {
    return challengeStore.getAllChallenges().map((challenge) => ({
        challengeId: challenge.id,
    }));
}

export default function ChallengePage({
    params,
}: {
    params: { challengeId: string };
}) {
    return <ChallengeClient challengeId={params.challengeId} />;
}
