<template>
    <div class="fifth-edition-info">
        <div class="row">
            <div class="col-md-4 info-stats-container">
                <div class="row info-stats">
                    <div class="armor-class col-md-6 info-stat-wrapper">
                        <h5>Armor Class</h5>
                        <span class="material-icons">shield</span>
                        <p>22</p>
                    </div>
                    <div class="hitpoints col-md-6 info-stat-wrapper">
                        <h5>Hitpoints</h5>
                        <span class="material-icons">favorite</span>
                        <p>48/48</p>
                    </div>
                </div>
                <div class="row info-stats">
                    <div class="armor-class col-md-6 info-stat-wrapper">
                        <h5>Hit Dice</h5>
                        <span class="material-icons">casino</span>
                        <p>D8</p>
                    </div>
                    <div class="armor-class col-md-6 info-stat-wrapper death-saves">
                        <h5>Death Saves</h5>
                        <div> 
                            <span class="death-save-text">Success :</span> 
                            <div class="death-save-node success checked"></div>
                            <div class="death-save-node success"></div>
                            <div class="death-save-node success"></div>
                        </div>
                        <div> 
                            <span class="death-save-text">Failures :</span> 
                            <div class="death-save-node failure checked"></div>
                            <div class="death-save-node failure"></div>
                            <div class="death-save-node failure"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 charcter-info-mid">
                <div class="character-image">
                    <img src="https://i.pinimg.com/564x/e4/75/95/e4759550ea779d844975731f8c2bbcde.jpg" />
                </div>
                <h2>Character Name</h2>
                <h3>Character Title</h3>
                <hr>
                <div class="character-level">
                    <p>5</p>
                </div>
            </div>
            <div class="col-md-4 info-stats-container">
                <div class="row info-stats">
                    <div class="proficiency col-md-6 info-stat-wrapper">
                        <h5>Proficiency</h5>
                        <span class="material-icons">settings_suggest</span>
                        <p>+3</p>
                    </div>
                    <div class="speed col-md-6 info-stat-wrapper">
                        <h5>Speed</h5>
                        <span class="material-icons">directions_run</span>
                        <p>30 ft.</p>
                    </div>
                </div>
                <div class="row info-stats">
                    <div class="proficiency col-md-6 info-stat-wrapper">
                        <h5>Inspiration</h5>
                        <span class="material-icons">music_note</span>
                        <p>2</p>
                    </div>
                    <div class="speed col-md-6 info-stat-wrapper">
                        <h5>Initiative</h5>
                        <span class="material-icons">sensor_occupied</span>
                        <p>+5</p>
                    </div>
                </div>
            </div>
        </div> 
        <hr>
    </div>
</template>