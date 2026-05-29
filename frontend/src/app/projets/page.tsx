import Title from '@/components/layout/Title';
import { projects } from '@/data/projects';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ProjectsPage() {
  return (
    <main>
      <Title title="Nos projets" />
      <section className="bg-brand-bg px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl p-8 text-brand-dark flex flex-row flex-wrap gap-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="relative mx-auto w-full max-w-sm pt-0"
            >
              <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
              <img
                src={project.picture}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
              />
              <CardHeader>
                <CardAction>
                  <Badge variant="secondary">Featured</Badge>
                </CardAction>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.shortDescription}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button className="w-full">View Event</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
