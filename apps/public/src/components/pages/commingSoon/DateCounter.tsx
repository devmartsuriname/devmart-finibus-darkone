/**
 * DateCounter
 * 
 * Purpose: Countdown timer for Coming Soon page.
 * Reads countdown configuration from system settings.
 * 
 * Phase 13D.4 — Countdown wiring (NO REDESIGN)
 * 
 * Behavior:
 * - When countdown enabled + valid target: shows live countdown
 * - When countdown disabled: shows zeros (hidden state)
 * - When target missing/invalid: graceful fallback (no errors)
 * 
 * Finibus 1:1 parity preserved - only data binding changed.
 */

import React, { useEffect, useRef, useState } from "react";
import { useSystemSettings } from "../../../hooks/useSystemSettings";

function DateCounter() {
  const [timerDays, setTimeDays] = useState<string | number>("00");
  const [timerHours, setTimerHours] = useState<string | number>("00");
  const [timerMinutes, setTimerMinutes] = useState<string | number>("00");
  const [timerSeconds, setTimerSeconds] = useState<string | number>("00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const { settings, isLoading } = useSystemSettings();

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Don't start countdown while loading
    if (isLoading) return;

    // Check if countdown is enabled
    if (!settings.coming_soon_countdown_enabled) {
      // Countdown disabled - show zeros
      setTimeDays("00");
      setTimerHours("00");
      setTimerMinutes("00");
      setTimerSeconds("00");
      return;
    }

    // Determine countdown target
    let countdownDate: Date;

    if (settings.coming_soon_countdown_target) {
      // Try to parse the target datetime
      const parsed = new Date(settings.coming_soon_countdown_target);
      if (!isNaN(parsed.getTime())) {
        countdownDate = parsed;
      } else {
        // Invalid date - fallback to 30 days from now
        countdownDate = new Date();
        countdownDate.setDate(countdownDate.getDate() + 30);
      }
    } else {
      // No target set - fallback to 30 days from now
      countdownDate = new Date();
      countdownDate.setDate(countdownDate.getDate() + 30);
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      if (distance < 0) {
        // Countdown finished
        setTimeDays("00");
        setTimerHours("00");
        setTimerMinutes("00");
        setTimerSeconds("00");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeDays(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    };

    // Initial update
    updateTimer();

    // Start interval
    intervalRef.current = setInterval(updateTimer, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isLoading, settings.coming_soon_countdown_enabled, settings.coming_soon_countdown_target]);

  return (
    <>
      <div id="timer">
        <div className="countdate">
          <p>{timerDays}</p>
          <span>Days</span>
        </div>
        <div className="countdate">
          <p>{timerHours}</p>
          <span>Hours</span>
        </div>
        <div className="countdate">
          <p>{timerMinutes}</p>
          <span>Minutes</span>
        </div>
        <div className="countdate">
          <p>{timerSeconds}</p>
          <span>Seconds</span>
        </div>
      </div>
    </>
  );
}

export default DateCounter;
