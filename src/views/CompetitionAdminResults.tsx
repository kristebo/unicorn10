import React from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';
import type { IEntry, IEntryListResponse } from '../features/competitions/competition.types';
import { View } from '../components/View';
import { httpGet } from '../utils/fetcher';
import { Link } from '../components/Link';

const byScore = (a: IEntry, b: IEntry) => a.score - b.score;

const CompetitionAdminResults = () => {
    const { id } = useParams<{ id: string }>();
    const { data: entries } = useSWR<IEntryListResponse>(
        `competitions/entries/?competition_id=${id}&limit=1000`,
        httpGet
    );

    if (!entries) {
        return null;
    }

    return (
        <View>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                            Entry
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                            Credit
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                            Owner
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                            Email
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                            Phone
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                            Score
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {entries.results.sort(byScore).map((e) => {
                        const owner = e.contributors.find((c) => c.is_owner);
                        return (
                            <tr key={e.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{e.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{owner.user.display_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {owner.user.first_name} {owner.user.last_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">{owner.user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{owner.user.phone_number}</td>

                                <td className="px-6 py-4 whitespace-nowrap">{e.score}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <p className="p-4 text-xl">Rows are sorted by score.</p>
            <p className="mx-4">
                <Link to={`/admin/competitions/${id}`}>Back to competition</Link>
            </p>
        </View>
    );
};

export default CompetitionAdminResults;
