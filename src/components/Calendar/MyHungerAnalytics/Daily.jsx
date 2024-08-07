import React, { useLayoutEffect, useMemo } from 'react';
import styled from 'styled-components';
import StackGraph from './Graph/StackGraph';
import colors from '../../../styles/colors';
import PieGraph from './Graph/PieGraph';
import { useCalendarContext } from '../../../context/CalendarContext';
import { useGetWeeklyStatics } from '../../../hooks/useAsync';

const Daily = () => {
    const { currentSelect } = useCalendarContext();
    const { selectedWeek } = useMemo(() => currentSelect, [currentSelect]);
    const firstDayOfFirstWeek = useMemo(() => selectedWeek[0].date, [selectedWeek]);
    const lastDayOfLastWeek = useMemo(() => selectedWeek[selectedWeek.length - 1].date, [selectedWeek]);

    const [dailyState, refetch] = useGetWeeklyStatics(firstDayOfFirstWeek, lastDayOfLastWeek);

    useLayoutEffect(() => {
        refetch();
    }, [selectedWeek]);

    if(dailyState.loading){
        return;
    }

    return (
        <StyledDaily>
            <div className="stack-graph-wrapper">
                <h2>가짜 배고픔을 느낀 횟수</h2>
                <StackGraph data={dailyState.data.periodStatistics.map(e => e.totalFakeHungerOccurrences)} />
            </div>

            <div className="stack-graph-wrapper">
                <h2>가짜 배고픔에 속은 횟수</h2>
                <StackGraph data={dailyState.data.periodStatistics.map(e => e.totalFakeHungerFailures)} />
            </div>

            <div className="pie-graph-wrapper">
                <h2>가짜 배고픔을 느낀 시간대</h2>
                <div className="pie-graph-with-hours">
                    <PieGraph type={"weekly"} data={dailyState.data.totalFakeHungerTimeDistribution} />
                    <span className='time time-24'>24</span>
                    <span className='time time-6'>6</span>
                    <span className='time time-12'>12</span>
                    <span className='time time-18'>18</span>
                </div>
            </div>
        </StyledDaily>
    );
};

const StyledDaily = styled.div`

    h2{
        margin-bottom: 33px;
        font-weight: 400;
        font-size: 14px;
        color: ${colors.black};
    }

    .stack-graph-wrapper{
        margin-bottom: 60px;
    }

    .pie-graph-wrapper{
        margin-bottom: 100px;

        .pie-graph-with-hours{
            width: 220px;
            aspect-ratio: 1/1;
            margin: 0 auto;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            .time{
                position: absolute;
                color: ${colors.gray5};
                font-size: 12px;
            }

            .time-24{
                top: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            .time-6{
                top: 50%;
                right: 5px;
                transform: translateY(-50%);
            }

            .time-12{
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            .time-18{
                left: 0;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }

`;

export default Daily;


const periodStatistics = [
    { "date": "2024-07-29", "totalFakeHungerOccurrences": 2, "totalFakeHungerFailures": 0 },
    { "date": "2024-07-30", "totalFakeHungerOccurrences": 1, "totalFakeHungerFailures": 1 },
    { "date": "2024-07-31", "totalFakeHungerOccurrences": 0, "totalFakeHungerFailures": 0 },
    { "date": "2024-08-01", "totalFakeHungerOccurrences": 3, "totalFakeHungerFailures": 0 },
    { "date": "2024-08-02", "totalFakeHungerOccurrences": 1, "totalFakeHungerFailures": 0 },
    { "date": "2024-08-03", "totalFakeHungerOccurrences": 4, "totalFakeHungerFailures": 1 },
    { "date": "2024-08-04", "totalFakeHungerOccurrences": 2, "totalFakeHungerFailures": 0 }
];

const totalFakeHungerTimeDistribution = [
    1, 2, 0, 3, 0, 0, 4, 0, 1, 2,
    0, 5, 0, 1, 3, 0, 2, 0, 4, 1,
    0, 2, 0, 0, 1, 4, 0, 2, 1, 0,
    3, 0, 0, 2, 0, 1, 0, 0, 0, 5,
    0, 2, 1, 0, 0, 3, 1, 2, 0, 0
]