'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { connectionService } from '@/services/connection.service';
import { connectionController } from '@/controllers/connection.controller';
import { UserPlus, UserCheck, Clock, Check, X, Loader2 } from 'lucide-react';

export default function FollowButton({ targetUserId }) {
  const { user } = useAuth();
  const [connectionState, setConnectionState] = useState({ status: 'none' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid || !targetUserId || user.uid === targetUserId) {
      setLoading(false);
      return;
    }

    const unsubscribe = connectionService.subscribeConnectionStatus(
      user.uid,
      targetUserId,
      (data) => {
        setConnectionState(data);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, targetUserId]);

  if (!user || user.uid === targetUserId) return null;

  if (loading) {
    return (
      <button className="btn btn-sm btn-light border rounded-pill px-2 py-0.5 disabled" style={{ fontSize: '0.7rem' }}>
        <Loader2 size={11} className="spinner-border spinner-border-sm" />
      </button>
    );
  }

  const { status, senderId } = connectionState;
  const isSender = senderId === user.uid;

  // 1. CONNECTED STATE (High-visibility white background on blue bar)
  if (status === 'connected') {
    return (
      <button
        onClick={() => connectionController.handleDisconnect(user.uid, targetUserId)}
        className="btn btn-sm bg-white text-success rounded-pill px-2.5 py-0.5 fw-bold d-inline-flex align-items-center gap-1 shadow-sm border-0"
        style={{ fontSize: '0.7rem' }}
        title="Click to disconnect"
      >
        <UserCheck size={12} /> Connected
      </button>
    );
  }

  // 2. PENDING REQUEST STATE
  if (status === 'pending') {
    if (isSender) {
      return (
        <button
          onClick={() => connectionController.handleDisconnect(user.uid, targetUserId)}
          className="btn btn-sm bg-white text-dark rounded-pill px-2.5 py-0.5 fw-bold d-inline-flex align-items-center gap-1 border-0"
          style={{ fontSize: '0.7rem' }}
          title="Cancel request"
        >
          <Clock size={12} className="text-warning" /> Pending
        </button>
      );
    } else {
      return (
        <div className="d-flex align-items-center gap-1">
          <button
            onClick={() => connectionController.handleAccept(user.uid, targetUserId)}
            className="btn btn-sm btn-success text-white rounded-pill px-2 py-0.5 fw-bold d-inline-flex align-items-center gap-1 border-0"
            style={{ fontSize: '0.7rem' }}
          >
            <Check size={12} /> Accept
          </button>
          <button
            onClick={() => connectionController.handleDisconnect(user.uid, targetUserId)}
            className="btn btn-sm btn-light text-danger rounded-circle p-1"
            style={{ width: 20, height: 20, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            title="Decline"
          >
            <X size={12} />
          </button>
        </div>
      );
    }
  }

  // 3. DEFAULT CONNECT BUTTON
  return (
    <button
      onClick={() => connectionController.handleConnect(user.uid, targetUserId)}
      className="btn btn-sm text-white border-0 rounded-pill px-2.5 py-0.5 fw-bold d-inline-flex align-items-center gap-1 shadow-2xs"
      style={{ background: '#f15a24', fontSize: '0.7rem' }}
    >
      <UserPlus size={12} /> Connect
    </button>
  );
}