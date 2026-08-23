import React from 'react';
import { NavTab, UserAccount, SubscriptionTier } from '../types';
import { AccessGuard } from '../components/AccessGuard';

export interface WithSubscriptionAccessOptions {
  tab: NavTab;
  requiredTier?: SubscriptionTier;
}

export function withSubscriptionAccess<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithSubscriptionAccessOptions
) {
  return function GuardedComponent(
    props: P & {
      currentUser?: UserAccount;
      masterAccessGranted?: boolean;
      onNavigateTab?: (tab: NavTab) => void;
      onToggleMasterAccess?: () => void;
    }
  ) {
    const { currentUser, masterAccessGranted, onNavigateTab, onToggleMasterAccess, ...restProps } = props;

    if (!currentUser || masterAccessGranted === undefined || !onNavigateTab || !onToggleMasterAccess) {
      // If props not provided through HOC wrapper directly, render wrapped component
      return <WrappedComponent {...(restProps as P)} />;
    }

    return (
      <AccessGuard
        tab={options.tab}
        user={currentUser}
        masterAccessGranted={masterAccessGranted}
        onNavigateTab={onNavigateTab}
        onToggleMasterAccess={onToggleMasterAccess}
      >
        <WrappedComponent {...(restProps as P)} />
      </AccessGuard>
    );
  };
}
