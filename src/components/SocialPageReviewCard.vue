<script setup></script>
<template>
    <div class="shadow bg-white flex flex-col px-4 py-4 my-2 justify-start items-center hover:card-float-up">
        <div class="review-card w-full h-fit ">
            <div class="reviewer flex justify-start items-center mb-2">
                <div class="reviewer-img mr-2"></div>
                <div class="reviewer-name text-xl cursor-text">
                    評論者名稱
                </div>
            </div>
            <div class="flex justify-start items-end mb-2">

                <!-- ! stars -->
                <div class="ratings relative mr-2 text-gray-200 text-2xl">
                    <div class="empty_star">★★★★★</div>
                    <div class="full_star absolute text-yellow-400">★★★★★</div>
                </div>
                <div class="review-time text-xl font text-gray-400 cursor-text"> 2019/02/04</div>

            </div>

            <div class="review-content text-xl font-bold ">
                <span class="ellipsis-4 cursor-text">
                    2019花在彰化活動將從2月5日到2月19日新春期間，在溪州公園盛大開幕，展出各式的彰化在地花卉，結合彰化縣燈會，邀請全國民眾利用春節期間攜家帶眷，前來彰化參觀走春，並到溪州公園白日看花、晚間遊園賞燈，期間還有各式豐富精采的表演，歡迎來彰化玩！，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各間攜家帶眷，前來彰化參觀走春，並到溪州公園白日看花、晚間遊園賞燈，期間還有各式豐富精采的表演，歡迎來彰化玩！，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各，在溪州公園盛大開幕，展出各
                </span>
                <span class="font-bold text-blue-500 hover:underline">全文</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ratings {
    /*調整字體大小可放大縮小星星*/
    text-shadow: 0px 1px 0 #999;
}

.full_star {
    width: 20%;
    /*調整寬度可變更星等*/
    left: 0;
    top: 0;
    overflow: hidden;
}

.reviewer-img {
    width: 1.75rem;
    height: 1.75rem;
    border: 1px solid #000000;
    vertical-align: middle;
    border-radius: 50%;
}

.ellipsis {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.ellipsis-4 {
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
}

.hover\:underline:hover {
    text-decoration: underline;
}

.hover\:card-float-up:hover {
    border-color: #eee;
    transition: all .2s ease-in-out;
    box-shadow: 0 16px 32px 0 rgba(48, 55, 66, 0.15);
    transform: translate(0, -5px);
    transition-delay: 0s;
    cursor: pointer;
}
</style>