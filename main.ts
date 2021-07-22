// Setting up radio function to change time remotely
radio.setGroup(1)

// Defining time
let timemins = 0
let time = 0
// Setting up the LED strip
let strip = neopixel.create(DigitalPin.P0, 144, NeoPixelMode.RGB)
// Setting a colour for the LEDS
let r = 0
let g = 255
let b = 0
let r1 = 0
let g1 = 0
let b1 = 255
let colouram = neopixel.rgb(r, g, b)
let colourpm = neopixel.rgb(r1, g1, b1)
let colour = colouram
let brightness = 255
strip.setBrightness(brightness)
// Defining variables for each word
let its = strip.range(0, 3)
let half = strip.range(4, 4)
let ten = strip.range(9, 3)
let quarter = strip.range(16, 7)
let twenty = strip.range(26, 6)
let five = strip.range(32, 4)
let past = strip.range(41, 4)
let to = strip.range(46, 2)
let ten1 = strip.range(48, 3)
let two = strip.range(53, 3)
let six = strip.range(57, 3)
let nine = strip.range(61, 4)
let happy = strip.range(66, 5)
let birthday = strip.range(75, 9)
let eight = strip.range(84, 5)
let three = strip.range(90, 5)
let twelve = strip.range(96, 6)
let one = strip.range(103, 3)
let seven = strip.range(110, 5)
let four = strip.range(116, 4)
let eleven = strip.range(121, 6)
let oclock = strip.range(132, 6)
let five1 = strip.range(140, 4)
// Setting up day/year
let day = 0
let year = 2021
let leap = false
// birthday
let birthdaydate = 20
let bday = false
// alarm
let alarm = true
let alarmtime = 840
// Turning on its and oclock as they always need to be on
its.showColor(colour)
oclock.showColor(colour)


// Radio controls
radio.onReceivedValue(function (name, value) {
    if (name == "time") {
        time += value
    }
    if (name == "brghtns") {
        brightness += value
        strip.setBrightness(brightness)
        strip.clear()
        its.showColor(colour)
        oclock.showColor(colour)
    }
    if (name == "R") {
        r += value
        colour = neopixel.rgb(r, g, b)
        strip.clear()
        its.showColor(colour)
        oclock.showColor(colour)
    }
    if (name == "G") {
        g += value
        colour = neopixel.rgb(r, g, b)
        strip.clear()
        its.showColor(colour)
        oclock.showColor(colour)
    }
    if (name == "B") {
        b += value
        colour = neopixel.rgb(r, g, b)
        strip.clear()
        its.showColor(colour)
        oclock.showColor(colour)
    }
    if (name == "day") {
        day += value
    }
    if (name == "year") {
        year += value
    }
})

// New function because contents in time-sensitive
basic.forever(function () {
    // Increasing time every 30 seconds
    while (time < 2880) {
        basic.pause(30000)
        time += 1
    }
})
// birthday animation
function birthdayanimation() {
    bday = true

    strip.clear()
    happy.showColor(colour)
    birthday.showColor(colour)

    bday = false
}
// function for date and year checks
basic.forever(function () {
    // Change Brightness
    strip.setBrightness(brightness)
})

basic.forever(function () {
    radio.sendNumber(strip.power())
    basic.pause(5000)
})

basic.forever(function () {
    if (year % 4 == 0 && year % 400 != 0) {
        leap = true
    } else {
        leap = false
    }
    if ((day == birthdaydate && !(leap)) || (birthdaydate >= 60 && leap && day == birthdaydate + 1) || (birthdaydate <= 59 && leap && day == birthdaydate)) {
        birthdayanimation()
    }
    if ((day == 366 && !(leap)) || (day == 367 && leap)) {
        day = 0
    }
})
basic.forever(function () {

    input.onButtonPressed(Button.A, function on_button_pressed_a() {

        time += 60
    })
    // Resetting time after one day, increasing date
    if (time == 2880) {
        time = 0
        day++
    }

    // Changing the colour if am/pm
    if (time == 1440) {
        colour = colourpm
        strip.clear()
        its.showColor(colour)
        oclock.showColor(colour)
    }

    if (time == 0) {
        colour = colouram
        strip.clear()
        its.showColor(colour)
        oclock.showColor(colour)
    }


    if (!(bday)){
        // Hours
        if (time >= 65 && time < 185 || time >= 1505 && time < 1625) {
            one.showColor(colour)
            twelve.clear()
        }
        if (time >= 185 && time < 305 || time >= 1625 && time < 1745) {
            two.showColor(colour)
            one.clear()
        }
        if (time >= 305 && time < 425 || time >= 1745 && time < 1865) {
            three.showColor(colour)
            two.clear()
        }
        if (time >= 425 && time < 545 || time >= 1865 && time < 1985) {
            four.showColor(colour)
            three.clear()
        }
        if (time >= 545 && time < 665 || time >= 1985 && time < 2105) {
            five1.showColor(colour)
            four.clear()
        }
        if (time >= 665 && time < 785 || time >= 2105 && time < 2225) {
            six.showColor(colour)
            five1.clear()
        }
        if (time >= 785 && time < 905 || time >= 2225 && time < 2345) {
            seven.showColor(colour)
            six.clear()
        }
        if (time >= 905 && time < 1025 || time >= 2345 && time < 2465) {
            eight.showColor(colour)
            seven.clear()
        }
        if (time >= 1025 && time < 1145 || time >= 2465 && time < 2585) {
            nine.showColor(colour)
            eight.clear()
        }
        if (time >= 1145 && time < 1265 || time >= 2585 && time < 2705) {
            ten1.showColor(colour)
            nine.clear()
        }
        if (time >= 1265 && time < 1385 || time >= 2705 && time < 2825) {
            eleven.showColor(colour)
            ten1.clear()
        }
        if (time >= 1385 && time < 1505 || time >= 2825 || time < 65) {
            twelve.showColor(colour)
            ten1.clear()
        }
        // Minutes
        timemins = time % 120
        if (timemins >= 5 && timemins < 15 || timemins >= 105 && timemins < 115 || timemins >= 45 && timemins < 55 || timemins >= 65 && timemins < 75) {
            five.showColor(colour)
        } else {
            five.clear()
        }
        if (timemins >= 15 && timemins < 25 || timemins >= 95 && timemins < 105) {
            ten.showColor(colour)
        } else {
            ten.clear()
        }
        if (timemins >= 25 && timemins < 35 || timemins >= 85 && timemins < 95) {
            quarter.showColor(colour)
        } else {
            quarter.clear()
        }
        if (timemins >= 35 && timemins < 55 || timemins >= 65 && timemins < 85) {
            twenty.showColor(colour)
        } else {
            twenty.clear()
        }
        if (timemins >= 55 && timemins < 65) {
            half.showColor(colour)
        } else {
            half.clear()
        }
        // Past/to - have a more general rule
        if (timemins >= 5 && timemins < 65) {
            past.showColor(colour)
            to.clear()
        }
        if (timemins >= 65 && timemins < 115) {
            to.showColor(colour)
            past.clear()
        } else {
            to.clear()
        }
    }
})
