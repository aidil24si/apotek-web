import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Loading from "./Loading";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setProfile(profileData);
      }
      
      setLoading(false);
    };

    checkAuth();

    // Listen untuk perubahan auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      
      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        setProfile(profileData);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Jika tidak ada session, redirect ke login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada allowedRoles dan user tidak memiliki role yang sesuai
  if (allowedRoles.length > 0 && profile) {
    const userRole = profile.role?.toLowerCase();
    const hasAccess = allowedRoles.some(role => role.toLowerCase() === userRole);
    
    if (!hasAccess) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}