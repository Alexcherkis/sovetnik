import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Components';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-serif font-bold text-brand-200">404</h1>
        <h2 className="text-3xl font-serif font-bold text-brand-900 mt-4 mb-6">Страница не найдена</h2>
        <p className="text-slate-600 mb-8 text-lg">
          Возможно, вы опечатались в адресе или страница была перемещена. Но не волнуйтесь, мы поможем вам вернуться.
        </p>
        <div className="flex justify-center gap-4">
          <Button to="/" variant="primary" className="flex items-center">
            <Home size={18} className="mr-2" />
            На главную
          </Button>
          <Button to="/contacts" variant="white">
            Написать нам
          </Button>
        </div>
      </div>
    </div>
  );
};