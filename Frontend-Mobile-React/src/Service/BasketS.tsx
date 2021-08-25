export class BasketS {
    static basketList: any = [];

    static getBasketList() {
        return this.basketList;
    }

    static setBasketList(data: { ProductsId: any; Name: string | null | undefined; Description: string | null | undefined; Count: number; }) {
        var index = this.basketList.findIndex((obj: { ProductsId: string; }) => obj.ProductsId === data.ProductsId);
        console.log(index);
        if (index == -1) {
            this.basketList.push(data);
        } else {
            this.basketList[index].Count += data.Count;
        }
        console.log(this.basketList);
    }

    static removeBasketList() {
        this.basketList = []
        return this.basketList;
    }

    static deleteItemBasket(val: any) {
        for (let i = 0; i < this.basketList.length; i++) {
            if (this.basketList[i].ProductsId == val) {
                this.basketList.splice(i, 1)
                return this.basketList;
            }
        }
        return [];
    }

    static switchCount(id: any, count: any) {
        var index = this.basketList.map((item: { ProductsId: any; }) => item.ProductsId).indexOf(id);
        console.log(index);
        if (typeof (Number(count)) == "number") {
            console.log("count")
            if (count > 0) {
                this.basketList[index].Count = count;
                return this.basketList;
            }
            else {
                return false;
            }
        }
    }
}