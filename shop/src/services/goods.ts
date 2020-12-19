import Http from '@/services/Http'

let http = new Http()

export async function getImageGroup() :Promise<API.ImageGroup[] | null> {
    let { data } = await Http.get('ImageGroup/groupList')
    return data
    
}

export async function saveImageGroup(name: string, id: number = 0) {
    return http.post('ImageGroup/save', {name, id})
}

export async function getGoodImageByLastId(groupId: number, lastId: number = 0, size : number = 15) :Promise<API.GoodsImage[]> {
    let { data } = await Http.get('GoodsImage/imageList', { groupId, lastId, size })
    return data ? data : []
}

export async function uploadGoodsImage(fileList:File[], groupId: number | string = 0) {
    let formData = new FormData();
    formData.append('groupId', String(groupId))
    for(let i = 0; i < fileList.length; i ++) {
        formData.append('file[]', fileList[i]);
    }
    let result = await http.post('GoodsImage/upload', formData)
    return result
}