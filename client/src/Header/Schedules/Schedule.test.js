import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import moment from 'moment';

import ScheduleList from './index';

describe('ScheduleList Component', () => {
    it('should the all day message when no schedules provided', () => {
        const { queryByTestId, queryByText } = render(<ScheduleList schedules={[]} />);
        expect(queryByText('All Day!')).toBeInTheDocument();
        expect(queryByText('Everything currently in the opensourceradio vault shuffled up!')).toBeInTheDocument();
        expect(queryByTestId('schedule-list').children.length).toEqual(1);
    });


    it('should render a schedule', () => {
        const testSchedule = {
            id: 123,
            name: 'Test Name',
            length: 2,
            description: 'testing',
            start_time: moment().toISOString(),
        };

        const { queryByText } = render(<ScheduleList schedules={[testSchedule]} />);
        expect(queryByText('Test Name')).toBeInTheDocument();
        expect(queryByText('testing')).toBeInTheDocument();
    });

    it('should render a schedule', () => {
        const testScheduleOne = {
            id: 123,
            name: 'Test Name One',
            length: 1,
            description: 'testing one',
            start_time: moment().startOf('d').add(8,'h').startOf('h').toISOString(),
        };

        const testScheduleTwo = {
            id: 1234,
            name: 'Test Name Two',
            length: 2,
            description: 'testing two',
            start_time: moment().startOf('d').add(8,'h').startOf('h').add(3, 'h').toISOString(),
        };

        const { queryByTestId } = render(<ScheduleList schedules={[testScheduleOne, testScheduleTwo]} />);
        expect(queryByTestId('schedule-list').children.length).toEqual(5);
    });

});
