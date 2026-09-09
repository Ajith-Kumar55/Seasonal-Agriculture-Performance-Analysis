import React from 'react';
import { AlertTriangle, Info, ShieldAlert, CheckCircle } from 'lucide-react';

interface AlertBoxProps {
  type?: 'info' | 'warning' | 'important' | 'success';
  title: string;
  children: React.ReactNode;
}

export const AlertBox: React.FC<AlertBoxProps> = ({
  type = 'info',
  title,
  children
}) => {
  const styles = {
    info: {
      bg: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
      icon: Info,
      iconColor: 'text-blue-400'
    },
    warning: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
      icon: AlertTriangle,
      iconColor: 'text-amber-400'
    },
    important: {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
      icon: ShieldAlert,
      iconColor: 'text-rose-400'
    },
    success: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
      icon: CheckCircle,
      iconColor: 'text-emerald-400'
    }
  };

  const current = styles[type];
  const Icon = current.icon;

  return (
    <div className={`border rounded-xl p-4 my-4 flex items-start space-x-3 text-xs leading-relaxed ${current.bg}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${current.iconColor}`} />
      <div>
        <p className="font-semibold text-slate-100 text-sm mb-1">{title}</p>
        <div>{children}</div>
      </div>
    </div>
  );
};
