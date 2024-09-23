import { create } from 'zustand';
import { supabase } from '@/api/supabase';

const useListStore = create((set, get) => ({
  data: [],
  singleData: null,
  error: null,
  isLoading: false,
  page: 1,
  hasMore: true,
  setSingleData: (newData) => set({ singleData: newData }),
  fetchData: async (tableName, id = null) => {
    const { page } = get();
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve));

    try {
      // 전체 데이터를 가져올지, 특정 데이터를 가져올지 분기 처리
      let query = supabase.from(tableName).select('*');

      if (id) {
        // 특정 ID가 있는 경우, 단일 데이터 조회
        query = query.eq('id', id).single();
      } else {
        query = query
          .order('create_at', { ascending: false })
          .range((page - 1) * 10, page * 10 - 1);
      }

      const { data: fetchData, error } = await query;

      if (error) {
        console.error('에러 발생:', error.message);
        set({ error: error.message, data: [], singleData: null });
      } else {
        if (id) {
          // 단일 데이터를 가져왔을 때는 singleData에 저장
          set({ singleData: fetchData, error: null });
        } else {
          set((state) => ({
            data: page === 1 ? fetchData : [...state.data, ...fetchData],
            error: null,
            page: state.page + 1,
            hasMore: fetchData.length === 10,
          }));
        }
      }
    } catch (error) {
      console.error('네트워크 에러:', error.message);
      set({ error: error.message, data: [], singleData: null });
    } finally {
      set({ isLoading: false });
    }
  },
  resetPagination: () => set({ page: 1, hasMore: true, data: [] }),
}));

export default useListStore;
