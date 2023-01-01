<template>
    <div class="characters-page">
        <div class="generic-form">
            <select name="settings" id="settings">
                <option value="all">All</option>
                <option value="fifthedition">5th Edition</option>
                <option value="savageworlds">Savage Worlds</option>
            </select>
        </div>
        <div class="character-flex">
            <CharacterAddNewCharacter />
            <CharacterListCharacters />
        </div>
    </div>
</template>