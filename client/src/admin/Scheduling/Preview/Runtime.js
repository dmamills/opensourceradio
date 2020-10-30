import React from 'react';

import { humanDurationOfPlaylist } from '../../../utils';

const Runtime = ({ playlist, isPast = false }) => <p>It {isPast ? 'ran' : 'will run'} for {humanDurationOfPlaylist(playlist)} playing {playlist.length} songs.</p>

export default Runtime;
