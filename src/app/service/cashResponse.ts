

class CashResponse<T> {
  cash: Map<string, T>

  constructor(cash:Map<string, T>) {
    this.cash = cash
  }

 getItemCash(id: string) {
    return this.cash.get(id);
  };

  setItemCash(id: string, data: T) {
    this.cash.set(id, data);
  };

  public  deleteItemCash(key: string)  {
    this.cash.delete(key)
  }

  public  changeKeyCash = (key: string, Item: T) => {
    this.cash.set(key, Item)
  }

}

export  { CashResponse };