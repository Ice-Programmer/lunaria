import background1 from '@/assets/project/create/project-overview-header-background.png';
import background2 from '@/assets/project/create/project-overview-header-background-v2.png';
import background3 from '@/assets/project/create/project-overview-header-background-v3.png';
import background4 from '@/assets/project/create/project-overview-header-background-v4.png';
import background5 from '@/assets/project/create/project-overview-header-background-v5.png';

const projectBackgrounds = [
  background1,
  background2,
  background3,
  background4,
  background5,
] as const;

export const getRandomProjectBackground = () => {
  const randomIndex = Math.floor(Math.random() * projectBackgrounds.length);
  return projectBackgrounds[randomIndex];
};
