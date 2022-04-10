<template>
    <div class="style-page">
        <h1>For Testing Styles</h1>
        <section class="border-separator">
            <h2>Card Banner</h2>
            <BannersMultiCard design="three">
                <UtilsCard 
                    heading="Variables"
                    content="There are some Variables to be added"
                    link_url="/"
                    link_name="Lorem"
                />
                <UtilsCard 
                    heading="Lorem Ipsum!!"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    link_url="/"
                    link_name="Ipsum!"
                    btn_design="fill"
                />
                <UtilsCard 
                    heading="An app component"
                    content="Use this app to make something new!"
                />
            </BannersMultiCard>
        </section>
    </div>
</template>