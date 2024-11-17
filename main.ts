let read_blynk = 0
esp8266.init(SerialPin.P15, SerialPin.P16, BaudRate.BaudRate115200)
basic.pause(5000)
if (esp8266.isESP8266Initialized()) {
    basic.showIcon(IconNames.Yes)
} else {
    basic.showIcon(IconNames.No)
}
esp8266.connectWiFi("makmal@unifi", "sejaya@123")
basic.pause(5000)
if (esp8266.isWifiConnected()) {
    basic.showIcon(IconNames.Happy)
} else {
    basic.showIcon(IconNames.Sad)
}
basic.forever(function () {
    read_blynk = parseFloat(esp8266.readBlynk("yoIIs1U-5Fe05wjmysVcfsuBUY9Z5rKO", "V1"))
    read_blynk = parseFloat(esp8266.readBlynk("yoIIs1U-5Fe05wjmysVcfsuBUY9Z5rKO", "V2"))
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P0,
    true,
    false,
    true
    )
})
basic.forever(function () {
    if (makerbit.isUltrasonicDistanceLessThan(5, DistanceUnit.CM)) {
        motionbit.brakeMotor(MotionBitMotorChannel.M1)
    } else {
        motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, 128)
        basic.pause(2000)
    }
    if (true) {
        OLED12864_I2C.showString(
        0,
        0,
        "TEMPERATURE",
        1
        )
        OLED12864_I2C.showNumber(
        0,
        0,
        dht11_dht22.readData(dataType.temperature),
        1
        )
        OLED12864_I2C.showString(
        0,
        0,
        "HUMIDITY",
        1
        )
        OLED12864_I2C.showNumber(
        0,
        0,
        dht11_dht22.readData(dataType.humidity),
        1
        )
    }
})
basic.forever(function () {
    read_blynk = parseFloat(esp8266.readBlynk("yoIIs1U-5Fe05wjmysVcfsuBUY9Z5rKO'''", "V0"))
    if (read_blynk == 1) {
        basic.showIcon(IconNames.Heart)
    } else {
        basic.showIcon(IconNames.SmallHeart)
    }
})
