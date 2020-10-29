import React from 'react';

import { getPlaylistDuration, durationToHuman } from '../../../utils';

const compose = (a, b) => c => a(b(c))
const humanDurationOfPlaylist = compose(durationToHuman,getPlaylistDuration);

const Runtime = ({ playlist, isPast = false }) => <p>It {isPast ? 'ran' : 'will run'} for {humanDurationOfPlaylist(playlist)} playing {playlist.length} songs.</p>

export default Runtime;
