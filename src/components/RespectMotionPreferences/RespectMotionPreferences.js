'use client';
import { MotionConfig } from 'framer-motion';
import React from 'react';

function RespectMotionPreferences({ child }) {
	return <MotionConfig>{child}</MotionConfig>;
}

export default RespectMotionPreferences;
