import {test, expect} from '@playwright/test'
import { connect } from 'http2'

test('Launch empik com', async({page}) => {    // have to use async and await 
    await page.goto('https://www.empik.com/') // await makes that only when line 4 step is done
                                                // the next line will be executed
    await expect(page).toHaveTitle("Empik.com | 10 000 000 produktów i pomysłów na prezent | Dostawa za 0 zł z Empik Premium")
        // simply check if title is what we expect
    await page.getByRole('button', {name: 'Zaakceptuj Zgody'}).click()      // accepting cookies
    await page.getByPlaceholder('Wpisz czego szukasz').fill('wspinaczka')
        // types climbing in 'what are you looking for' search box
    await page.locator("form[action='.'] button[type='submit']").click()    // submit search click
    await page.locator('.PopularCategories__title').filter({has: page.getByText('Buty do wspinania')}).click()
        // getting all elements with class=PopularCategories__title and then filtering by text and click
    await page.locator('.expandLink.contbrandFacet').click()        // show more of shoe brands
    await page.locator("label[for='brandFacetscarpa']").click()     // checking salewa
    await page.locator("label[for='shoeSize39']").click()           // choosing shoe size
    await page.locator(".ta-product-title", {hasText:'Buty wspinaczkowe SCARPA Instinct VSR'}).first().click()
        // finding right shoes through filtering by text and class
    await page.locator("div[data-ta-section$='priceMainContainer'] > button").click()   // adding to cart
    await page.locator(".drawer-desktop-header > button").click()
    const gift_check = await page.getByRole('listitem').nth(0)  // nth(0) its the same as .first()
    await gift_check.click()      // checking if first listitem its 'Gifts' link

    const gifts = page.locator(".pw-nav-wrapper .pw-nav-tile")  // getting all elements from Find Best Present  
    for (let i = 0; i < await gifts.count(); i++){              // iterating from 0 to gifts.count -1 
        const single_gift = gifts.nth(i);                       // assigning every single element to single_gift
        const title = await single_gift.textContent();          // getting text content from the element
        const href = await single_gift.getAttribute('href');    // checking if element has inside a "href" attribute
        const has_link = !!href;                                // double negating to return only TRUE/FALSE
        console.log(`${title} ${has_link ? 'Link exist' : 'Link does not exist'}`);
            // writing in console title and if it has link or not
        if (title.includes('Dla nastolatka')){  // if title contains 'Dla nastolatka'
            await single_gift.click();          // then click on elements that contains that
        }
    }
    await page.locator(".productBox__title", {hasText:'Głośniki'}).click()  // clicks on speakers
    await page.selectOption('#search-sort-select', {label: 'Popularność: największa'})
        // click on static dropdown and sort by most popular

    const jbl_speaker = page.locator('.product-details-wrapper',            // creating a const for specific speaker
        {has: page.getByText('Głośnik bezprzewodowy JBL Flip 6, różowy')});  
    await jbl_speaker.hover()                                               // hover over this speaker
    await jbl_speaker.locator('button.ta-add-to-cart-btn').click()          // click to add to cart button
    await page.locator(".empikNav__userText", {hasText:'Mój koszyk'}).click()   // goes to My Cart
})
