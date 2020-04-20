import axios, { AxiosResponse } from 'axios';
import { ElderCard } from '../interfaces/elderCard';
import { API, PAGE_SIZE } from './constants';

export function getCards(search?: string, page?: number):
    Promise<AxiosResponse<{ cards: ElderCard[]; _totalCount: number; }>> {
    return axios.get<{ cards: ElderCard[], _totalCount: number }>(API, {
        params: {
            pageSize: PAGE_SIZE,
            name: search,
            page,
        }
    });
}
