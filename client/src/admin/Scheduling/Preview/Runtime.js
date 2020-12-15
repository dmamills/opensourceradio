import React from 'react';

import { humanDurationOfPlaylist } from '../../../utils';

const Runtime = ({ playlist, isShuffle = false }) => <p>It will run for <strong>{humanDurationOfPlaylist(playlist)}</strong> {isShuffle? 'shuffling' : 'playing'} <strong>{playlist.length}</strong> songs.</p>

export default Runtime;
