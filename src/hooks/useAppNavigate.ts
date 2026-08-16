import { useNavigate } from 'react-router';

export const useAppNavigate = () => {
  const navigate = useNavigate();

  return {
    goBack: () => navigate(-1),
    goHome: () => navigate('/'),
    goCreateProject: () => navigate(`/project/create`),
  };
};
