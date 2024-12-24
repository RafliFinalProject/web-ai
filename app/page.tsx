import FileUpload from '@/components/FileUpload';
import GradientBackground from '@/components/ui/gradient-background';
import AnimatedHeader from '@/components/AnimatedHeader';
import { CommandMenu } from '@/components/CommandMenu';
import { InfoSheet } from '@/components/InfoSheet';
import { AnalysisHistory } from '@/components/AnalysisHistory';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <GradientBackground />
      <CommandMenu />
      <InfoSheet />
      <div className="max-w-5xl mx-auto pt-12">
        <AnimatedHeader />
        <FileUpload />
        <AnalysisHistory />
      </div>
    </main>
  );
}