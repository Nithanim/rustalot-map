import dayjs from "dayjs"

export interface TimeSelection {
    name: string,
    start: Dayjs,
    end: Dayjs,
}

export const selectionItems: TimeSelection[] = [
    {
        name: "Tag 1",
        start: dayjs('2024-02-25T18:00:00+01:00'),
        end: dayjs('2024-02-25T23:00:00+01:00'),
    },
    {
        name: "Tag 2",
        start: dayjs('2024-02-26T18:00:00+01:00'),
        end: dayjs('2024-02-26T23:00:00+01:00'),
    },
    {
        name: "Tag 3",
        start: dayjs('2024-02-27T18:00:00+01:00'),
        end: dayjs('2024-02-27T23:00:00+01:00'),
    },
    {
        name: "Tag 4",
        start: dayjs('2024-02-28T18:00:00+01:00'),
        end: dayjs('2024-02-28T23:00:00+01:00'),
    },
    {
        name: "Tag 5",
        start: dayjs('2024-03-01T18:00:00+01:00'),
        end: dayjs('2024-03-01T23:00:00+01:00'),
    },
    {
        name: "Tag 6",
        start: dayjs('2024-03-02T18:00:00+01:00'),
        end: dayjs('2024-03-02T23:00:00+01:00'),
    },
    {
        name: "Tag 7",
        start: dayjs('2024-03-03T18:00:00+01:00'),
        end: dayjs('2024-03-03T23:00:00+01:00'),
    },
]
