import { useNavigate } from 'react-router';

export const useAppNavigate = () => {
  const navigate = useNavigate();

  return {
    goHome: () => navigate('/'),
    goCreateProject: () => navigate(`/project/create`),
  };
};
