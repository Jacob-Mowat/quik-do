import { createContext, useContext, useReducer } from "react";

export enum TodoDateFilters {
    ALL = 'All',
    TODAY = 'Today',
    LAST_7_DAYS = 'Last 7 Days',
    LAST_30_DAYS = 'Last 30 Days',
};

export enum TodoFilterDispatchActions {
    SET_FILTER = 'set-filter',
};

const TodoFilterReducer = (filter: string, action: any) => {
    switch (action.type) {
        case TodoFilterDispatchActions.SET_FILTER:
            return action.payload.filter;
        default:
            return filter;
    }
}

type Action = { type: TodoFilterDispatchActions.SET_FILTER; payload: { filter: string } };

export const TodoFilterContext = createContext<string>('All');
export const TodoFilterDispatchContext = createContext<React.Dispatch<Action>>(() => {});

export const useTodoFilter = () => {
    return useContext(TodoFilterContext);
}

export const useTodoFilterDispatch = () => {
    return useContext(TodoFilterDispatchContext);
}

export const TodoFilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [filter, dispatch] = useReducer(TodoFilterReducer, 'All');

    return (
        <TodoFilterContext.Provider value={filter}>
            <TodoFilterDispatchContext.Provider value={dispatch}>
                {children}
            </TodoFilterDispatchContext.Provider>
        </TodoFilterContext.Provider>
    );
}