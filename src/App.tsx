import { Filters } from '@/components/Filters';
import { WorkOrderList } from '@/components/WorkOrderList';
import style from './App.style.module.css';

const App = () => {
  return (
    <main className={style.app}>
      <h1 className={style.title}>Case Study - Dynamic Filtering</h1>
      <Filters />
      <WorkOrderList />
    </main>
  );
};

export default App;
